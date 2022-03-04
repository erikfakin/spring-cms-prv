export const get = async (url) => {
  const res = await fetch(url)
  if (!res.ok) {
    const message = `An error occured: ${res.status}`
    throw new Error(message)
  }
  return res.json()
}

export const post = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  })
  if (!res.ok) {
    const message = `An error occured: ${res.status}`
    throw new Error(message)
  }
  return res
}

export const upload = async (url, file) => {
  const res = await fetch(url, {
    method: "POST",
    body: file,
  })
  if (!res.ok) {
    const message = `An error occured: ${res.status}`
    throw new Error(message)
  }
  return res
}
