import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import {
  setItems,
  addItem,
  editItem,
  startEditing,
  cancelEditing,
  saveEditing,
  deleteItem,
  setLoading,
  setError,
} from '../features/item/itemSlice';
import axios from 'axios';

const Items: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state: RootState) => state.items);
  const { user } = useSelector((state: RootState) => state.auth);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    // Fetch items from the server when the component mounts
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get('http://localhost:3000/items');
      dispatch(setItems(response.data.items));
    } catch (error) {
      console.error('Error fetching items:', error);
      dispatch(setError('Failed to fetch items'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post("http://localhost:3000/items", {
        title: newItem,
        userId: user?.id, // Include userId when adding a new item
      });
      const { success, newItem: addedItem } = response.data;

      if (success) {
        dispatch(addItem(addedItem));
        setNewItem('');
      } else {
        // Handle add item failure
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleToggleEditMode = (id: number) => {
    // Dispatch startEditing action with the item ID to initiate editing
    dispatch(startEditing(id));
  };

  const handleCancelEditing = (id: number) => {
    // Dispatch cancelEditing action with the item ID to cancel editing
    dispatch(cancelEditing(id));
  };

  const handleSaveEditing = async (id: number) => {
    const editedTitle = items.find((item) => item.id === id)?.editedTitle;
    if (editedTitle) {
      try {
        const response = await axios.put(`http://localhost:3000/items/${id}`, {
          title: editedTitle,
        });

        const { success, updatedItem } = response.data;

        if (success) {
          // Dispatch saveEditing action with the item ID to save changes
          dispatch(saveEditing({ id, editedTitle: updatedItem.title }));
        } else {
          // Handle save editing failure
        }
      } catch (error) {
        console.error('Error saving edited item:', error);
      }
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3000/items/${id}`);
      const { success } = response.data;

      if (success) {
        dispatch(deleteItem(id));
      } else {
        // Handle delete item failure
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className='w-full'>
      <div className='flex justify-center items-center font-[Muli]'>
        <div className='w-1/3'>
          <input
            className=''
            type="text"
            placeholder="Enter a new item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </div>

        <button
          className='w-fit px-8 py-3 ml-5'
          onClick={handleAddItem}>
          Add Item
        </button>
      </div>
      {items.length === 0 && !loading ? (
        <p className='text-lg'>No items available.</p>
      ) : (
        <ul className='flex justify-center items-center flex-col'>
          {items.map((item) => (
            <li className='w-2/4' key={item.id}>
              {item.isEditing ? (
                <div className='flex items-center'>
                  <input
                    className='flex flex-1 border-none'
                    type="text"
                    value={item.editedTitle || ''}
                    onChange={(e) =>
                      dispatch(editItem({ id: item.id, editedTitle: e.target.value }))
                    }
                  />
                  <button
                    className='w-fit px-5 bg-white border text-black'
                    onClick={() => handleSaveEditing(item.id)}>Save</button>
                  <button
                    className='w-fit px-5 bg-white border text-red-600 ml-3'
                    onClick={() => handleCancelEditing(item.id)}>Cancel</button>
                </div>
              ) : (
                <div className='flex items-center'>
                  <span className='flex flex-1'>{item.title}</span>
                  <button
                    className='w-fit px-5 bg-white border text-black'
                    onClick={() => handleToggleEditMode(item.id)}>Edit</button>
                  <button
                    className='w-fit px-5 bg-white border text-red-600 ml-3'
                    onClick={() => handleDeleteItem(item.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Items;
