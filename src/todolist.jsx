import PropTypes from 'prop-types';
import React from 'react';
import { createUseStyles } from 'react-jss';

import { CLASS_NAME_PREFIX } from './core/constants';
import { compose, noop } from './core/fp';
import {
  checkAllAreCompleted,
  filterCompletedTasks,
  moveCompletedToBottom,
  orderTasksBy,
  showBottomCounter,
  showBottomProgress,
  showTopCounter,
  showTopProgress,
} from './core/utils';
import { PlacementType, TasksType, TitleType } from './prop-types';
import NapprTodoListCheckerComponent from './todolist-checker';
import NapprTodoListFooterComponent from './todolist-footer';
import NapprTodoListHeaderComponent from './todolist-header';
import NapprTodoListTasksComponent from './todolist-tasks';

const BASE_CLASS = `${CLASS_NAME_PREFIX}-container`;

const useStyles = createUseStyles({
  container: {
    height: '100%',
    maxHeight: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    minWidth: '100%',
    width: '100%',
  },
  wrp: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-start',
    maxHeight: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    minWidth: '100%',
    width: '100%',
  },
});

const NapprTodoListComponent = React.memo(
  ({
    completedAtBottom,
    counterPosition,
    id,
    onChange,
    onCreate,
    onDelete,
    onToggleAll,
    order,
    orderBy,
    showCompleted,
    showCounter,
    showProgress,
    tasks,
    title,
  }) => {
    const classes = useStyles();
    const filtered = compose(
      (!showCompleted && filterCompletedTasks) || noop,
      (completedAtBottom && moveCompletedToBottom) || noop,
      (order && orderTasksBy(orderBy, order)) || noop
    )(tasks);
    const allChecked = checkAllAreCompleted(tasks);
    const counterOnTop = showTopCounter(counterPosition, showCounter);
    const progressOnTop = showTopProgress(counterPosition, showProgress);
    const counterOnBottom = showBottomCounter(counterPosition, showCounter);
    const progressOnBottom = showBottomProgress(counterPosition, showProgress);
    const containerProps = {};
    if (id) containerProps.id = id;
    return (
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...containerProps}
        className={`${BASE_CLASS} ${classes.container}`}>
        <div className={`${BASE_CLASS}-wrp ${classes.wrp}`}>
          <NapprTodoListHeaderComponent
            parentId={id}
            showCounter={counterOnTop}
            createHandler={onCreate}
            showProgress={progressOnTop}
            tasks={tasks}
            title={title}
          />
          {onToggleAll && (
            <NapprTodoListCheckerComponent
              allChecked={allChecked}
              checkAllHandler={onToggleAll}
              parentId={id}
            />
          )}
          <NapprTodoListTasksComponent
            tasks={filtered}
            changeHandler={onChange}
            deleteHandler={onDelete}
            parentId={id}
          />
          <NapprTodoListFooterComponent
            showCounter={counterOnBottom}
            showProgress={progressOnBottom}
            tasks={tasks}
          />
        </div>
      </div>
    );
  }
);

NapprTodoListComponent.defaultProps = {
  completedAtBottom: true,
  counterPosition: 'bottom',
  id: null,
  onCreate: null,
  onDelete: false,
  onToggleAll: false,
  order: false,
  orderBy: 'label',
  showCompleted: true,
  showCounter: false,
  showProgress: false,
  tasks: [],
  title: false,
};

NapprTodoListComponent.propTypes = {
  completedAtBottom: PropTypes.bool,
  counterPosition: PlacementType,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
  onDelete: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onToggleAll: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  order: PropTypes.oneOf([false, 'desc', 'asc']),
  orderBy: PropTypes.oneOf(['label', 'id', 'mtime', 'ctime']),
  showCompleted: PropTypes.bool,
  showCounter: PropTypes.bool,
  showProgress: PropTypes.bool,
  tasks: TasksType,
  title: TitleType,
};

export default NapprTodoListComponent;
