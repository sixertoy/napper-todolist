import PropTypes from 'prop-types';
import React from 'react';
import { createUseStyles } from 'react-jss';

import { CLASS_NAME_PREFIX } from './core/constants';
import { TasksType } from './prop-types';
import NapprTodoListTaskComponent from './todolist-task';

const BASE_CLASS = `${CLASS_NAME_PREFIX}-tasks`;

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flex: 1,
    position: 'relative',
  },
  wrp: {
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    left: 0,
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

function defaultItemsRenderer(obj, changeHandler, deleteHandler, parentId) {
  return (
    <NapprTodoListTaskComponent
      key={obj.id}
      checked={obj.checked}
      id={obj.id}
      label={obj.label}
      onChangeHandler={
        (changeHandler && ((...rest) => changeHandler(...rest, parentId))) ||
        null
      }
      onDeleteHandler={
        (deleteHandler && ((...rest) => deleteHandler(...rest, parentId))) ||
        null
      }
    />
  );
}

const NapprTodoListTasksComponent = ({
  changeHandler,
  deleteHandler,
  parentId,
  render,
  tasks,
}) => {
  const classes = useStyles();
  return (
    <div className={`${BASE_CLASS} ${classes.container}`}>
      <div className={`${BASE_CLASS}-wrp ${classes.wrp}`}>
        {tasks.map(obj => {
          const renderer = render || defaultItemsRenderer;
          return renderer(obj, changeHandler, deleteHandler, parentId);
        })}
      </div>
    </div>
  );
};

NapprTodoListTasksComponent.defaultProps = {
  deleteHandler: null,
  parentId: null,
  render: null,
};

NapprTodoListTasksComponent.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  render: PropTypes.func,
  tasks: TasksType.isRequired,
};

export default NapprTodoListTasksComponent;
