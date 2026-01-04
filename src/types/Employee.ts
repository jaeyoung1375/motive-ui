export type employeeDto = {
  map: any;
  employeeId?: number;
  id: string;
  password?: string;
  name: string;
  employeePosit: string;
  email: string;
  emailDomain: string;
  mobile1: string;
  mobile2: string;
  mobile3: string;
  fax1: string;
  fax2: string;
  fax3: string;
  ext1: string;
  ext2: string;
  ext3: string;
  addr1: string;
  addr2: string;
  addr3: string;
  deptName: string;
  profileImage?: string;
  memo?: string;
  status?: string;
  startDt: string;
  retireDt?: Date;
  leaveDt?: Date;
  leaveReson?: string;
};

export const INIT_EMPLOYEE: employeeDto = {
  id: '',
  name: '',
  employeePosit: '',
  email: '',
  emailDomain: '',
  mobile1: '',
  mobile2: '',
  mobile3: '',
  fax1: '',
  fax2: '',
  fax3: '',
  ext1: '',
  ext2: '',
  ext3: '',
  addr1: '',
  addr2: '',
  addr3: '',
  deptName: '',
  startDt: '',
  map: undefined
};
