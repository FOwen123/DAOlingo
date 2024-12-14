'use client';  

import React, { useState } from 'react';

const CreateProposal = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, description, startDate, endDate });
    // You can send this data to the backend or Solana contract here
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 mt-10 space-y-6"
    >
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Create a New Proposal
      </h1>

      <div className="flex flex-col space-y-2">
        <label htmlFor="title" className="text-gray-700 font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
          placeholder="Enter proposal title"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="description" className="text-gray-700 font-medium">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 h-32 focus:outline-none focus:ring focus:ring-indigo-300"
          placeholder="Describe the details of your proposal"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="startDate" className="text-gray-700 font-medium">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="endDate" className="text-gray-700 font-medium">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
      </div>

      <div>
        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
        >
          Create Proposal
        </button>
      </div>
    </form>
  );
};

export default CreateProposal;
