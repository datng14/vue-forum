export const findById = (resources, id) => {
  return resources.find(r => r.id === id)
}

export const upsert = (resources, resource) => {
  const index = resources.findIndex(t => t.id === resource.id)
  if (resource.id && index !== -1) {
    resources[index] = resource
  } else {
    resources.push(resource)
  }
}
