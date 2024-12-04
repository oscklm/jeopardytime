import { createStore } from 'stan-js';
import { storage } from 'stan-js/storage';

type Game = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  sessions: number;
};

const dummyData: Game[] = [
  {
    id: '1',
    title: 'Random Math',
    description: 'Random Description',
    createdAt: new Date(),
    sessions: 10,
  },
  {
    id: '2',
    title: 'Yet Another Math',
    description: 'Yet Another Description',
    createdAt: new Date(),
    sessions: 10,
  },
];

export const { useStore: useGameStore, reset } = createStore({
  games: storage(dummyData),
  get totalGames() {
    return this.games.length;
  },
});
