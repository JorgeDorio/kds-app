export interface IOrderDetails {
  id: string;
  orderId: string;
  title: string;
  type: string;
  doughType: string;
  observation: string[];
  flavors: string[];
  flowId: string;
  stationId: string;
}

export class EmptyOrderDetails implements IOrderDetails {
  id: string = "";
  orderId: string = "";
  title: string = "";
  type: string = "";
  doughType: string = "";
  observation: string[] = [];
  flavors: string[] = [];
  flowId: string = "";
  stationId: string = "";
}
