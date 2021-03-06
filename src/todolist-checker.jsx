import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { createUseStyles, useTheme } from 'react-jss';

import { CLASS_NAME_PREFIX } from './core/constants';

const BASE_CLASS = `${CLASS_NAME_PREFIX}-checker`;

const useStyles = createUseStyles({
  btn: ({ theme }) => ({
    alignItems: 'flex-start',
    color: theme.color,
    display: 'flex',
    flexDirection: 'row',
    fontSize: '1rem',
  }),
  container: {
    marginBottom: 12,
  },
  lbl: {},
});

const NapprTodoListCheckerComponent = ({
  allChecked,
  checkAllHandler,
  parentId,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const needUpdate = allChecked !== checked;
    if (needUpdate) setChecked(allChecked);
  }, [allChecked, checked]);
  return (
    <div className={`${BASE_CLASS} ${classes.container}`}>
      <button
        className={`${BASE_CLASS}-btn ${classes.btn}`}
        type="button"
        onClick={() => {
          const next = !checked;
          setChecked(next);
          checkAllHandler(next, parentId);
        }}>
        <div className={`${BASE_CLASS}-lbl ${classes.lbl}`}>
          {!checked && <span>Check all</span>}
          {checked && <span>Uncheck all</span>}
        </div>
      </button>
    </div>
  );
};

NapprTodoListCheckerComponent.defaultProps = {
  parentId: null,
};

NapprTodoListCheckerComponent.propTypes = {
  allChecked: PropTypes.bool.isRequired,
  checkAllHandler: PropTypes.func.isRequired,
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default NapprTodoListCheckerComponent;
