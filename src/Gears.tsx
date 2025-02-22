import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import gears from "./static/gears.glb";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import CustomShaderMaterialVanilla from "three-custom-shader-material/vanilla";
import slicedVertexShader from "./shaders/sliced/vertex.glsl";
import slicedFragmentShader from "./shaders/sliced/fragment.glsl";
import { useControls } from "leva";

type GLTFResult = GLTF & {
  nodes: {
    outerHull: THREE.Mesh;
    axle: THREE.Mesh;
    gears: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
    ["Material.003"]: THREE.MeshStandardMaterial;
  };
};

export default function Gears(props: JSX.IntrinsicElements["group"]) {
  const ref = useRef<THREE.Group | null>(null);
  const { nodes } = useGLTF(gears) as GLTFResult;

  const uniforms = useMemo(
    () => ({
      uSliceStart: new THREE.Uniform(1.75),
      uSliceArc: new THREE.Uniform(1.25),
    }),
    []
  );

  const patchMap = useMemo(
    () => ({
      csm_Slice: {
        "#include <colorspace_fragment>": `
        #include <colorspace_fragment>
        
        if(!gl_FrontFacing)
          gl_FragColor = vec4(.75, .15, .3, 1.0);
        `,
      },
    }),
    [] // Empty dependency array since this doesn't depend on any props or state
  );

  useControls({
    uSliceStart: {
      value: 1.75,
      min: -Math.PI,
      max: Math.PI,
      step: 0.001,
      onChange: (value) => {
        uniforms.uSliceStart.value = value;
      },
    },
    sliceEnd: {
      value: 1.25,
      min: 0,
      max: Math.PI * 2,
      step: 0.001,
      onChange: (value) => {
        uniforms.uSliceArc.value = value;
      },
    },
  });

  const outerMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        metalness: 0.5,
        roughness: 0.25,
        envMapIntensity: 0.5,
        color: "#858080",
      }),
    []
  );

  const slicedMaterial = useMemo(
    () =>
      new CustomShaderMaterialVanilla({
        //CSm
        baseMaterial: THREE.MeshStandardMaterial,
        vertexShader: slicedVertexShader,
        fragmentShader: slicedFragmentShader,
        uniforms: uniforms,
        metalness: 0.5,
        roughness: 0.25,
        envMapIntensity: 0.5,
        color: "#858080",
        side: THREE.DoubleSide,
        patchMap: patchMap,
      }),
    [uniforms, patchMap]
  );

  const slicedDepthMaterial = useMemo(
    () =>
      new CustomShaderMaterialVanilla({
        //CSm
        baseMaterial: THREE.MeshDepthMaterial,
        vertexShader: slicedVertexShader,
        fragmentShader: slicedFragmentShader,
        uniforms: uniforms,
        patchMap: patchMap,
        depthPacking: THREE.RGBADepthPacking,
      }),
    [uniforms, patchMap]
  );

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.1;
  });
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.outerHull.geometry}
        material={slicedMaterial}
        customDepthMaterial={slicedDepthMaterial}
        scale={3.714}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.axle.geometry}
        material={outerMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.gears.geometry}
        material={outerMaterial}
        position={[0, 1.595, -0.691]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[1, 1, 1.016]}
      />
    </group>
  );
}

useGLTF.preload("/gears.glb");
