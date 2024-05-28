import IState from "../states/states-interface";

export default interface IOrder {
      id: number;
      state: IState;
      email: string;
      city: string;
      province: string;
      date: string;
  }