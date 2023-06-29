//user endpoints 

import { toFormData } from "@core/helpers/utils";
import { CategoryProp, ProfileResponse, Provinces } from "@core/interfaces";
import { ApiRedux } from "../api";

export const extendedApiUser = ApiRedux.injectEndpoints({
    endpoints: build =>({
        getCategories: build.query<CategoryProp[], void>({
            query: () => ({
              url: '/member/preference/category/list',
            }),
            providesTags: ['User'],
          }),
          setCategories: build.mutation<
            CategoryProp[],
            { userCategories: CategoryProp[] }
          >({
            query: (body: { userCategories: CategoryProp[] }) => ({
              url: '/member/preference/category',
              method: 'POST',
              body,
            }),
            invalidatesTags: ['User'],
          }),
          getUserProfile: build.query<ProfileResponse, void>({
            query: () => ({
              url: '/api/user',
            }),
            providesTags: ['User'],
          }),
          getProvinces: build.query<Provinces[], void>({
            query: () => ({
              url: '/province/list',
            }),
          }),
          updateProfile: build.mutation<
            ProfileResponse,
            { gender: string; provinceCode: string }
          >({
            query: (body: { gender: string; provinceCode: string }) => ({
              url: '/api/user/profileUpdate',
              method: 'PUT',
              body,
            }),
            invalidatesTags: ['User'],
          }),
          uploadAvatar: build.mutation<ProfileResponse, { file: any }>({
            query: body => ({
              url: '/api/avatar/upload',
              method: 'POST',
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              body: toFormData(body),
            }),
            invalidatesTags: ['User'],
          }),
          updataEmail: build.mutation<ProfileResponse, { newEmail: string }>({
            query: body => ({
              url: `/api/user/change-email/${body.newEmail}`,
              method: 'POST',
            }),
            invalidatesTags: ['User'],
          }),
          updataPhone: build.mutation<string, { newPhone: string }>({
            query: body => ({
              url: `/api/user/change-phone/${body.newPhone}`,
              method: 'POST',
              responseHandler: 'text',
            }),
            invalidatesTags: ['User'],
          }),
          reloadInfoUser: build.mutation<null, void>({
            queryFn: () => ({ data: null }),
            invalidatesTags: ['User'],
          }),
    }),

    overrideExisting: false,
});

export const {useGetCategoriesQuery,
    useSetCategoriesMutation,
    useGetUserProfileQuery,
    useUpdateProfileMutation,
    useUpdataEmailMutation,
    useReloadInfoUserMutation,
    useUploadAvatarMutation,
    useGetProvincesQuery,
    useUpdataPhoneMutation,} = extendedApiUser;