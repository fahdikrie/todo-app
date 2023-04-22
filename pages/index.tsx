import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuidv4 } from 'uuid';

import Button from '@/components/button';
import Card from '@/components/card';
import CheckIcon from '@/components/check';
import Empty from '@/components/empty';
import RemoveIcon from '@/components/remove';
import useTodo from '@/store/to-do';
import cls from '@/styles/index.module.css';

export default function Home() {
  const [isAdding, setIsAdding] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const todos = useTodo((state) => state.todos);
  const addTodo = useTodo((state) => state.addTodo);
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

  return (
    <section className={cls.container}>
      <div className={cls.header}>
        <h1>Things you should be doing today...</h1>
        <div className={cls.buttons}>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)}>Add New</Button>
          )}
          <Button variant="ghost" theme="danger">
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
            <Card key={todo.id} className={cls.todo}>
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
    </section>
  );
}
