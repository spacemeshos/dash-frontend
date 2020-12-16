export const reMappingNetworkArray = (data) => data.map((network) => {
  return {
    value: network.dashAPI,
    label: network.netName,
    explorer: network.explorer,
  };
});
