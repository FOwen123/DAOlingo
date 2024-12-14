'use client';

import { useState } from 'react';

interface Proposal {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  yesVotes: string[];
  noVotes: string[];
}

export default function ProposalsPage() {
  const [proposals] = useState<Proposal[]>([
    {
      id: 1,
      title: 'Increase English Classes Budget',
      shortDescription: 'Increase funds for English grammar classes...',
      fullDescription: 'We propose allocating more budget towards English grammar classes, including hiring more qualified instructors, providing better materials, and offering additional study sessions.',
      yesVotes: ['Alice', 'Bob'],
      noVotes: ['Charlie']
    },
    {
      id: 2,
      title: 'Start a New Grammar Podcast',
      shortDescription: 'A weekly English grammar podcast...',
      fullDescription: 'We propose launching a weekly English grammar podcast to help learners understand nuances through discussions, interviews with experts, and Q&A sessions with listeners.',
      yesVotes: [],
      noVotes: ['Dave', 'Eve']
    }
  ]);

  const [expanded, setExpanded] = useState<number | null>(null);

  const handleToggleExpand = (id: number) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center items-start">
      <div className="max-w-3xl w-full space-y-6">
        {proposals.map((proposal) => {
          const isExpanded = expanded === proposal.id;
          return (
            <div
              key={proposal.id}
              className="bg-[#FFF8D6] w-full p-6 rounded-xl shadow-md transition-shadow duration-300"
            >
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {proposal.title}
              </h2>
              {!isExpanded ? (
                <>
                  <p className="text-gray-700 mb-2">{proposal.shortDescription}</p>
                  <button
                    onClick={() => handleToggleExpand(proposal.id)}
                    className="text-blue-600 underline"
                  >
                    Read more
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-700 mb-4">{proposal.fullDescription}</p>
                  <div className="flex space-x-4 items-center mb-4">
                    <div>
                      <strong className="text-green-600">Yes:</strong>{' '}
                      {proposal.yesVotes.length ? proposal.yesVotes.join(', ') : 'No votes yet'}
                    </div>
                    <div>
                      <strong className="text-red-600">No:</strong>{' '}
                      {proposal.noVotes.length ? proposal.noVotes.join(', ') : 'No votes yet'}
                    </div>
                  </div>
                  <div className="flex space-x-4 mb-4">
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                      Vote Yes
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                      Vote No
                    </button>
                  </div>
                  <button
                    onClick={() => handleToggleExpand(proposal.id)}
                    className="text-sm text-gray-600 underline"
                  >
                    Show less
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
