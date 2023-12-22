
import { ApiRedux } from "../api";


export const extendedApiOperator = ApiRedux.injectEndpoints({
    endpoints: build => ({


        changePassOperator: build.mutation<
            void,
            { oldPassword: string; newPassword: string; retryNewPassword: string }
        >({
            query: (body) => ({
                url: "/backoffice/merchant/operator/change-password",
                method: "PUT",
                body,
                responseHandler: 'text'
            }),
            invalidatesTags: ["User"],
        }),

    }),
    overrideExisting: false,
});

export const { useChangePassOperatorMutation } = extendedApiOperator;