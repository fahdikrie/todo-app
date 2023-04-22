import { useState } from 'react';

import Button from '@/components/button';
import Empty from '@/components/empty';
import cls from '@/styles/index.module.css';

export default function Home() {
  const [isAdding, setIsAdding] = useState(false);

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
        <div className={cls.create_todo}>
          <input placeholder="Add new to-do title..." />
          <div className={cls.buttons}>
            <Button variant="ghost" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button>Create</Button>
          </div>
        </div>
      )}
      <div className={cls.todo_list}>
        <Empty />
      </div>
    </section>
  );
}
