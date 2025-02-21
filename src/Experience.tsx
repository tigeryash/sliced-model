import { Environment, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import bg from "./static/aerodynamics_workshop.hdr";

function Experience() {
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls />
      <Environment
        background
        files={bg}
        backgroundIntensity={0.4}
        backgroundBlurriness={0.5}
      />
      <mesh position={[0, -1, 0]}>
        <icosahedronGeometry args={[2.5, 5]} />
        <meshStandardMaterial
          metalness={0.5}
          roughness={0.25}
          envMapIntensity={0.5}
          color={"#858080"}
        />
      </mesh>

      <mesh
        position={[-4, -3, -4]}
        receiveShadow
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      >
        <planeGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color={"#aaaaaa"} />
      </mesh>

      <directionalLight
        position={[6.25, 3, 4]}
        intensity={2.6}
        color={"#ffffff"}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={15}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-camera-near={0.1}
      />
      <ambientLight intensity={0.2} />
    </>
  );
}

export default Experience;
