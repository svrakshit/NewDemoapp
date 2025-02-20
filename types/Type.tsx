// types.ts
export type RootStackParamList = {
    LoginApp: undefined;
    Drawernavigator: undefined;
    SelectFederation: undefined;  // Add this type for SelectFederation screen
    Home: undefined;  // No params for Home screen
    Login: undefined;  // No params for Login screen
    Profile: undefined;  // No params for Profile screen
    List: undefined;  // No params for List screen
    WarehouseDrawernavigator: undefined;
    AssyingDrawernavigator: undefined;
    DispatchDrawernavigator: undefined;
    RecieveDrawernavigator: undefined;
    HealthReportselect: undefined;
    
    DispatchRecieve :  { quantitymt: string };
    Dhasboard : undefined;

    "Generate Health Report": undefined;
    "Health Report list": undefined;
    "Dispatch Report list": undefined;
    "Dispatch Truck list": undefined;
    "Recieve Truck list": undefined;
    HealthReport :  { 
      truckNumber: string;
  grossWeight: string;
  netWeight: string;
  tareWeight: string;
  bagCount: string;
  size: string;
  selectedDate: Date;
     };

  };
  