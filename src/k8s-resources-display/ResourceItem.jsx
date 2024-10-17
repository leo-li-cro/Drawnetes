import { useNodesData } from '@xyflow/react';

function ResourceItem({id}) {
    const node = useNodesData(id);

    const name = node?.data?.name;
    const resourceType = node?.data?.resourceType;

    return (
        <button className="w-full border border-gray-100 text-center">
            {resourceType}/{name}
        </button>
    );
}

export default ResourceItem;