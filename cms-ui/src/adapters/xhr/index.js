export const get = async (url) => {
  const res = await fetch(url)
  if (!res.ok) {
    return {
      error: res.status,
    }
  }
  return res.json()
}

export const getProtected = async (url) => {
  const res = await fetch(url, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
  if (!res.ok) {
    return {
      error: res.status,
    }
  }
  return res.json()
}

export const post = async (url, data) => {
  const res = await fetch(url, {
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
  return res
}

export const update = async (url, data) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({ ...data }),
  })
  if (!res.ok) {
    return { error: res.status }
  }
  return res
}

export const upload = async (url, file) => {
  const res = await fetch(url, {
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
  return res
}
