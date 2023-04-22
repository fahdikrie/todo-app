import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuidv4 } from 'uuid';

import Button from '@/components/button';
import Card from '@/components/card';
import CheckIcon from '@/components/check';
import Empty from '@/components/empty';
import RemoveIcon from '@/components/remove';
import useTodo from '@/store/to-do';
import cls from '@/styles/index.module.css';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,

    border: '0px',
    boxShadow:
      '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    borderRadius: '12px',
    fontFamily: 'Inter',
  },
};

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const todos = useTodo((state) => state.todos);
  const addTodo = useTodo((state) => state.addTodo);
  const clearTodos = useTodo((state) => state.clearTodos);
  const removeTodo = useTodo((state) => state.removeTodo);
  const updateTodoStatus = useTodo((state) => state.updateTodoStatus);

  useEffect(() => {
    setLoaded(true);
  }, [todos]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTodo>();

  const onAddTodo = (data: AddTodo) => {
    setIsAdding(false);

    addTodo({
      id: uuidv4(),
      timestamp: new Date().getTime(),
      name: data.name,
      isCompleted: false,
    });

    reset();
    setIsAdding(false);
  };

  const onClearTodo = () => {
    clearTodos();
    setModalOpen(false);
  };

  return (
    <section className={cls.container}>
      <div className={cls.header}>
        <h1>Things you should be doing today...</h1>
        <div className={cls.buttons}>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)}>Add New</Button>
          )}
          <Button
            variant="ghost"
            theme="danger"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Clear
          </Button>
        </div>
      </div>
      {isAdding && (
        <form className={cls.create_todo} onSubmit={handleSubmit(onAddTodo)}>
          <div className={cls.input}>
            <TextareaAutosize
              minRows={1}
              maxRows={2}
              placeholder="Add new to-do title..."
              {...register('name', { required: true, maxLength: 200 })}
            />
            {errors.name && errors.name.type === 'maxLength' && (
              <span>
                Title must be shorter than or equal to 100 characters.
              </span>
            )}
          </div>
          <div className={cls.buttons}>
            <Button
              variant="ghost"
              onClick={() => {
                setIsAdding(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      )}
      <div className={cls.todo_list}>
        {loaded && todos.length > 0 ? (
          todos.map((todo) => (
            <Card
              key={todo.id}
              className={`${cls.todo} ${todo.isCompleted && 'opacity-50'}`}
            >
              <CheckIcon
                isChecked={todo.isCompleted}
                onClick={() => updateTodoStatus(todo.id, !todo.isCompleted)}
              />
              <div className={cls.name}>{todo.name}</div>
              <RemoveIcon onClick={() => removeTodo(todo.id)} />
            </Card>
          ))
        ) : (
          <Empty />
        )}
      </div>
      <Modal isOpen={isModalOpen} style={modalStyle}>
        <div className={cls.modal_content}>Confirm to clear all todos?</div>
        <div className={cls.modal_buttons}>
          <Button
            variant="ghost"
            className={cls.cancel_button}
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            theme="danger"
            className={cls.confirm_button}
            onClick={() => onClearTodo()}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </section>
  );
}
