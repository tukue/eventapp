// frontend/src/tests/HomePage.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import HomePage from '../pages/HomePage'; // Update the import path

const mock = new MockAdapter(axios);

describe('HomePage', () => {
  it('fetches and displays events', async () => {
    const mockEvents = [
      {
        id: '1',
        attributes: {
          name: 'Event 1',
          description: 'Description 1',
          'location-name': 'Location 1',
          'thumbnail-image-url': 'http://example.com/thumb1.jpg',
          'large-image-url': 'http://example.com/large1.jpg',
        },
      },
    ];

    mock.onGet(process.env.NEXT_PUBLIC_BACKEND_API_URL).reply(200, { data: mockEvents });

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText('Event 1')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('Location 1')).toBeInTheDocument();
    });
  });
});