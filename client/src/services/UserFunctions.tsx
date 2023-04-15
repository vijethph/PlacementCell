/* eslint-disable no-underscore-dangle */
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const routePrefix = `${window.location.origin}/v1`;

export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
}

export interface IComment {
  _id: string;
  comment: string;
  firstName: string;
  lastName: string;
  email: string;
  updatedAt: string;
}

export interface IDiscussion {
  _id?: string;
  title: string;
  description: string;
  firstName?: string;
  lastName?: string;
  comments?: IComment[];
  focusedComment?: IComment;
}

export interface ICodePayload {
  code: string;
  language: string;
  parameters?: string;
}

export const getTimeAgo = (someDate: string) => dayjs(someDate).fromNow();

export const getData = async (url: string) => {
  try {
    const fetchResponse = await fetch(`${routePrefix}/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    if (!fetchResponse.ok) {
      throw new Error(JSON.stringify(fetchResponse));
    }
    return await fetchResponse.json();
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async (newUser: IUser) => {
  try {
    const registerResponse = await fetch(`${routePrefix}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newUser,
      }),
    });

    if (!registerResponse.ok) {
      throw new Error(JSON.stringify(registerResponse));
    }
    return await registerResponse.json();
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
};

export const loginUser = async (user: IUser) => {
  try {
    const loginResponse = await fetch(`${routePrefix}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });

    if (!loginResponse.ok) {
      throw new Error(JSON.stringify(loginResponse));
    }
    const tokenResponse = await loginResponse.json();
    if (tokenResponse.token) {
      localStorage.setItem("userToken", tokenResponse.token);
    }
    return tokenResponse;
  } catch (error) {
    console.error(error);
  }
};

// export const getProfile = getData(`${routePrefix}/users/profile`);
// export const getCompanies = getData(`${routePrefix}/companies/details`);
// export const getVideos = getData(`${routePrefix}/videos`);
// export const getQuestions = getData(`${routePrefix}/quiz`);
// export const getDiscussion = getData(`${routePrefix}/discussion`);

export const postDiscussion = async (discussion: IDiscussion) => {
  try {
    const token: string = localStorage.getItem("userToken") || "";
    const decodedPayload: IUser = jwt_decode(token);
    const discussionCreateResponse = await fetch(`${routePrefix}/discussions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: discussion.title,
        description: discussion.description,
        firstName: decodedPayload.firstName,
        lastName: decodedPayload.lastName,
        email: decodedPayload.email,
      }),
    });

    if (!discussionCreateResponse.ok) {
      throw new Error(JSON.stringify(discussionCreateResponse));
    }
    return await discussionCreateResponse.json();
  } catch (error) {
    console.error(error);
  }
};

export const putDiscussion = async (discussion: IDiscussion) => {
  try {
    const token: string = localStorage.getItem("userToken") || "";
    const decodedPayload: IUser = jwt_decode(token);
    const discussionUpdateResponse = await fetch(`${routePrefix}/discussions`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        discussionId: discussion._id,
        title: discussion.title,
        description: discussion.description,
        email: decodedPayload.email,
      }),
    });

    if (!discussionUpdateResponse.ok) {
      throw new Error(JSON.stringify(discussionUpdateResponse));
    }
    return await discussionUpdateResponse.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteDiscussion = async (discussion: IDiscussion) => {
  try {
    const token: string = localStorage.getItem("userToken") || "";
    const decodedPayload: IUser = jwt_decode(token);
    const discussionDeleteResponse = await fetch(`${routePrefix}/discussions`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        discussionId: discussion._id,
        email: decodedPayload.email,
      }),
    });

    if (!discussionDeleteResponse.ok) {
      throw new Error(JSON.stringify(discussionDeleteResponse));
    }
    return await discussionDeleteResponse.json();
  } catch (error) {
    console.error(error);
  }
};

export const postComment = async (discussion: IDiscussion, comment: string) => {
  try {
    const token: string = localStorage.getItem("userToken") || "";
    const decodedPayload: IUser = jwt_decode(token);
    const commentCreateResponse = await fetch(`${routePrefix}/discussions/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        discussionId: discussion._id,
        comment,
        firstName: decodedPayload.firstName,
        lastName: decodedPayload.lastName,
        email: decodedPayload.email,
      }),
    });

    if (!commentCreateResponse.ok) {
      throw new Error(JSON.stringify(commentCreateResponse));
    }
    return await commentCreateResponse.json();
  } catch (error) {
    console.error(error);
  }
};

export const putComment = async (discussion: IDiscussion, comment: string) => {
  try {
    const token: string = localStorage.getItem("userToken") || "";
    const decodedPayload: IUser = jwt_decode(token);
    const commentUpdateResponse = await fetch(`${routePrefix}/discussions/comments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        discussionId: discussion._id,
        comment,
        commentId: discussion.focusedComment?._id,
        email: decodedPayload.email,
      }),
    });

    if (!commentUpdateResponse.ok) {
      throw new Error(JSON.stringify(commentUpdateResponse));
    }
    return await commentUpdateResponse.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = async (discussion: IDiscussion) => {
  try {
    const token: string = localStorage.getItem("userToken") || "";
    const decodedPayload: IUser = jwt_decode(token);
    const commentDeleteResponse = await fetch(`${routePrefix}/discussions/comments`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        discussionId: discussion._id,
        commentId: discussion.focusedComment?._id,
        email: decodedPayload.email,
      }),
    });

    if (!commentDeleteResponse.ok) {
      throw new Error(JSON.stringify(commentDeleteResponse));
    }
    return await commentDeleteResponse.json();
  } catch (error) {
    console.error(error);
  }
};

export const executeCode = async (codeRequestPayload: ICodePayload) => {
  try {
    const token: string = localStorage.getItem("userToken") || "";
    const executeResponse = await fetch(`${routePrefix}/codes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        source: codeRequestPayload.code,
        callback: `${window.location.origin}/${routePrefix}/codes/events`,
        lang: codeRequestPayload.language,
        input: codeRequestPayload?.parameters,
      }),
    });

    if (!executeResponse.ok) {
      throw new Error(JSON.stringify(executeResponse));
    }
    return await executeResponse.json();
  } catch (error) {
    console.error(error);
  }
};

export const getCodeStatus = async (requestId: string) => {
  try {
    const token: string = localStorage.getItem("userToken") || "";
    const executeResponse = await fetch(`${routePrefix}/codes/${requestId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!executeResponse.ok) {
      throw new Error(JSON.stringify(executeResponse));
    }
    return await executeResponse.json();
  } catch (error) {
    console.error(error);
  }
};
