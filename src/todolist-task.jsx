import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { createUseStyles, useTheme } from 'react-jss';

import {
  NapperTodoListIconChecked,
  NapperTodoListIconTrash,
  NapperTodoListIconUnchecked,
} from './assets';
import { CLASS_NAME_PREFIX } from './core/constants';
import { IconType } from './core/prop-types';

const BASE_CLASS = `${CLASS_NAME_PREFIX}-task`;

const useStyles = createUseStyles({
  btn: ({ theme }) => ({
    alignItems: 'flex-start',
    color: theme.color,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    fontSize: '1rem',
  }),
  ckb: {
    marginRight: 3,
    paddingTop: '0.2rem',
  },
  dlt: {
    flex: '0 1',
    fontSize: '1.2rem',
    marginLeft: 6,
    marginRight: 12,
  },
  lbl: {
    fontSize: '1rem',
    lineHeight: '1.3rem',
  },
  task: ({ theme }) => ({
    '&:hover': {
      backgroundColor: theme.backgroundHover,
    },
    alignItems: 'center',
    borderRadius: theme.taskRadius,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 6,
    paddingTop: 6,
  }),
});

const NapperTodoListTaskComponent = ({
  Icons,
  checked,
  id,
  label,
  onChange,
  onDelete,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [isHover, setIsHover] = useState(false);
  const canDelete = isHover && onDelete;
  return (
    <div
      className={classnames(BASE_CLASS, classes.task)}
      data-id={`napper-todolist-task-${id}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <button
        className={classnames(`${BASE_CLASS}-btn`, classes.btn)}
        type="button"
        onClick={() => onChange(id, !checked)}>
        <div className={classnames(`${BASE_CLASS}-ckb`, classes.ckb)}>
          {checked && Icons.Checked}
          {!checked && Icons.Unchecked}
        </div>
        <div className={classnames(`${BASE_CLASS}-lbl`, classes.lbl)}>
          <span>{label}</span>
        </div>
      </button>
      {canDelete && (
        <button
          className={classnames(`${BASE_CLASS}-dlt`, classes.dlt)}
          type="button"
          onClick={() => onDelete(id)}>
          <NapperTodoListIconTrash />
        </button>
      )}
    </div>
  );
};

NapperTodoListTaskComponent.defaultProps = {
  Icons: {
    Checked: <NapperTodoListIconChecked />,
    Unchecked: <NapperTodoListIconUnchecked />,
  },
};

NapperTodoListTaskComponent.propTypes = {
  Icons: IconType,
  checked: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]).isRequired,
};

export default NapperTodoListTaskComponent;
