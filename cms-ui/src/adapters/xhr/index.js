import { apiUrl } from "utils/constants/env"

export const get = async (url) => {

  const res = await fetch(apiUrl + url)
  if (!res.ok) {
    return {
      error: res.status,
    }
  }
  return {data: await res.json()}
}

export const getProtected = async (url) => {
  const res = await fetch(apiUrl + url, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
  if (!res.ok) {
    return {
      error: res.status,
    }
  }
  return {data: await res.json()}
}

export const post = async (url, data) => {
  const res = await fetch(apiUrl + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({ ...data }),
  })
  if (!res.ok) {
    return { error: res.status }
  }
  return {data: res}
}

export const update = async (url, data) => {
  const res = await fetch(apiUrl + url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({ ...data }),
  })
  if (!res.ok) {
    console.log(res)
    return { error: res.status }
  }
  return {data: await res.json()}
}

export const upload = async (url, file) => {
  console.log(localStorage.getItem("token"))
  const res = await fetch(apiUrl + url, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    body: file,
  })
  if (!res.ok) {
    const message = `An error occured: ${res.status}`
    return {
      error: res.status,
    }
  }
  return {data: await res.json()}
}

export const deleteItem = async (url) => {
  const res = await fetch(apiUrl + url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
  if (!res.ok) {
    return { error: res.status }
  }
  return {data: res}
}
