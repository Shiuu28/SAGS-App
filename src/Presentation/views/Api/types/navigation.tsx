import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  pqrs: undefined;
  pqrs_detail: { id: number };
  CreatePQRS: undefined;
  EditPQRS: { id: number };
};

export type PQRSScreenNavigationProp = StackNavigationProp<RootStackParamList, 'pqrs'>;
export type PQRSDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'pqrs_detail'>;
export type PQRSDetailRouteProp = RouteProp<RootStackParamList, 'pqrs_detail'>;