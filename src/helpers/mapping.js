export const reMappingNetworkArray = (data) => data.map((network) => ({ value: network.dashAPI, label: network.netName, explorerUrl: network.explorer }));
