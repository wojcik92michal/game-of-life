import { InitHistoryHelper } from './init-history.helper';

const initHistoryHelper = new InitHistoryHelper();

const GosperGliderGunIndexes = `
(1,5);(1,6);
(2,5);(2,6);

(11,5);(11,6);(11,7);
(12,4);(12,8);
(13,3);(13,9);
(14,3);(14,9);
(15,6);
(16,4);(16,8);
(17,5);(17,6);(17,7);
(18,6);

(21,3);(21,4);(21,5);
(22,3);(22,4);(22,5);
(23,2);(23,6);

(25,1);(25,2);(25,6);(25,7);

(35,3);(36,4);
(36,3);(36,4)
`;

initHistoryHelper.setData(20, 40, GosperGliderGunIndexes);
export const GosperGliderGunData: boolean[][] = initHistoryHelper.getData();

const pulsarIndexes = `
(1,3);(1,4);(1,5);(1,4);(1,9);(1,10);(1,11);

(3,1);(3,6);(3,8);(3,13);
(4,1);(4,6);(4,8);(4,13);
(5,1);(5,6);(5,8);(5,13);

(6,3);(6,4);(6,5);(6,9);(6,10);(6,11);

(8,3);(8,4);(8,5);(8,9);(8,10);(8,11);

(9,1);(9,6);(9,8);(9,13);
(10,1);(10,6);(10,8);(10,13);
(11,1);(11,6);(11,8);(11,13);

(13,3);(13,4);(13,5);(13,4);(13,9);(13,10);(13,11)
`;

initHistoryHelper.setData(15, 15, pulsarIndexes);
export const pulsarData: boolean[][] = initHistoryHelper.getData();
