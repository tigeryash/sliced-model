uniform float uSliceStart;
uniform float uSliceArc;

varying vec3 vPosition;

void main(){
    float angle = atan(vPosition.y, vPosition.x); // Calculate the angle of the current fragment 
    angle -= uSliceStart;
    angle = mod(angle, PI2); // Normalize angle to [0, 2PI] range (0 to 360 degrees) so we can compare it to uSliceStart and uSliceArc
    
    if(angle > 0.0 && angle < uSliceArc)
        discard;
    float csm_Slice;
}