// components/Model.tsx

import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
    Object_3: THREE.Mesh;
    Object_4: THREE.Mesh;
    Object_5: THREE.Mesh;
    Object_6: THREE.Mesh;
    Object_7: THREE.Mesh;
  };
  materials: {
    phongE1SG: THREE.MeshStandardMaterial;
    phongE2SG: THREE.MeshStandardMaterial;
  };
};

const Model = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF('/kart/scene.gltf') as GLTFResult;

  return (
    <group {...props} dispose={null} scale={0.02} position={[0, 0, 0]}>
      <group rotation={[-Math.PI, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.phongE1SG} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.phongE1SG} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.phongE1SG} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.phongE1SG} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.phongE2SG} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.phongE2SG} />
      </group>
    </group>
  );
};

// Preload the GLTF so it's cached for faster loading
useGLTF.preload('/kart/scene.gltf');

export default Model;
