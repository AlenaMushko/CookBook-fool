export interface SuccessRefreshTokenRes {
  status: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
