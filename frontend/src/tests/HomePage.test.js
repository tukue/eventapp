import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import HomePage from '../pages/HomePage';

const mock = new MockAdapter(axios);

describe('HomePage', () => {
  afterEach(() => {
    mock.reset();
  });

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

    await act(async () => {
      render(<HomePage />);
    });

    await waitFor(() => {
      expect(screen.getByText('Event 1')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('Location 1')).toBeInTheDocument();
    });
  });

  it('displays a loading message while fetching events', () => {
    render(<HomePage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });


  it('loads more events when "Load More" button is clicked', async () => {
    const mockEventsPage1 = [
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

    const mockEventsPage2 = [
      {
        id: '2',
        attributes: {
          name: 'Event 2',
          description: 'Description 2',
          'location-name': 'Location 2',
          'thumbnail-image-url': 'http://example.com/thumb2.jpg',
          'large-image-url': 'http://example.com/large2.jpg',
        },
      },
    ];

    mock.onGet(process.env.NEXT_PUBLIC_BACKEND_API_URL).replyOnce(200, { data: mockEventsPage1 });
    mock.onGet(process.env.NEXT_PUBLIC_BACKEND_API_URL).replyOnce(200, { data: mockEventsPage2 });

    await act(async () => {
      render(<HomePage />);
    });

    await waitFor(() => {
      expect(screen.getByText('Event 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Load More'));

    await waitFor(() => {
      expect(screen.getByText('Event 2')).toBeInTheDocument();
    });
  });
});