
const validConnections = {
    'autoscaling': ['deployment', 'replica set', 'stateful set'],
    'config map': ['deployment', 'replica set', 'stateful set', 'daemon set'],
    'daemon set': ['config map', 'secret', 'persistent volume claim', 'service'],
    'deployment': ['autoscaling', 'config map', 'secret', 'persistent volume claim', 'service'],
    'ingress': ['service'],
    'persistent volume claim': ['persistent volume', 'daemon set', 'deployment', 'replica set', 'stateful set'],
    'persistent volume': ['persistent volume claim'],
    'replica set': ['autoscaling', 'config map', 'secret', 'persistent volume claim', 'service'],
    'secret': ['deployment', 'replica set', 'stateful set', 'daemon set'],
    'service': ['ingress', 'deployment', 'replica set', 'stateful set', 'daemon set'],
    'stateful set': ['autoscaling', 'config map', 'secret', 'persistent volume claim', 'service']
};

export default validConnections;