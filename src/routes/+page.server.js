import data from '../data/data.json';

export async function load() {
  return {
    jobs: data
  }
}