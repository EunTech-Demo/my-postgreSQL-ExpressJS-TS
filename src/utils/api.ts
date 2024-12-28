const errorResponse = (status: number, message: string) => {
  return {
    status,
    message,
  };
};

const successResponse = (data: any) => {
  return {
    status: 200,
    data,
  };
};

export const responseJSONTemplate = (arg0: {
  error: string | null;
  success: boolean;
  data: any;
  message: string | null;
  status: number;
}) => {
  return {
    ...arg0,
    error: `${arg0.error}`,
  };
};
