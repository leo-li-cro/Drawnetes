import CreateManifestButton from "./CreateManifestButton";
import DisplayK8sResources from "./DisplayK8sResources";


function K8sToolbar() {

    return (
        <div className="w-60 h-80 bg-white border-2 border-x-pink-600 border-gray flex flex-col justify-center items-center rounded-3xl">
            <DisplayK8sResources />
            <CreateManifestButton />
        </div>
    );
}

export default K8sToolbar;