import React, { useState, useEffect, use } from 'react';
import axios from 'axios';

interface ITodos {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export const App = () => {
  const [todos, setTodos] = useState<ITodos[]>();
  const [currentTodos, setCurrentTodos] = useState<ITodos[]>();
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async (): Promise<void> => {
    const todo = await axios.get('https://jsonplaceholder.typicode.com/todos');
    const todoCopy = await JSON.parse(JSON.stringify(todo?.data));
    setTodos(todo?.data);
    setCurrentTodos(todoCopy?.splice(0, 5));
  };

  const handlePageData = async (): Promise<void> => {
    const todoCopy = await JSON.parse(JSON.stringify(todos));
    setCurrentTodos(todoCopy.splice(page, 5));
  };

  useEffect(() => {
    handlePageData();
  }, [page]);

  return (
    <div className="p-2">
      <h5>Pagination React</h5>
      {currentTodos?.length > 0 && (
        <>
          <table>
            <tr>
              <th>User Id</th>
              <th>Title</th>
              <th>Completed</th>
            </tr>
            <tbody>
              {currentTodos?.map((item) => (
                <tr key={item?.id}>
                  <td>{item?.userId}</td>
                  <td>{item?.title}</td>
                  <td>{item?.completed}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <button
              className="pagination-button"
              style={{
                display: `${page === 0 ? 'none' : 'block'}`,
              }}
              onClick={() => setPage((prev) => prev - 5)}
            >
              Prev
            </button>
            <button
              className="pagination-button"
              style={{
                display: `${page + 5 === todos?.length ? 'none' : 'block'}`,
              }}
              onClick={() => setPage((prev) => prev + 5)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
