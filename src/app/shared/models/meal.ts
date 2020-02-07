export interface Meal {
  _id: string;
  image: string;
  name: string;
  desc: string;
  timeOfPreparation: string;
  author: {
    _id: string;
    name: string;
    surname: string;
  };
}
