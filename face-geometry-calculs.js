
const Container = document.getElementById('container');
let spScroll = 0;
class FaceGeometryCalculs {
    constructor() {
        this.EyesmovmentsMemory=[];
    }
    getEyesmovments(EyesCord){
        if(EyesCord[0]!==undefined){
            this.EyesmovmentsMemory.push(EyesCord)
            if (this.EyesmovmentsMemory.length > 10) {
                this.EyesmovmentsMemory.shift();
            }

        }
    }
    getOrder(){
        let probtoGoTop=0;
        let probtoGoBottom=0;
        for(let i=0;i<this.EyesmovmentsMemory.length-1;i++){
            if((this.EyesmovmentsMemory[i][0][1]-this.EyesmovmentsMemory[i+1][0][1])>=2){
                
                probtoGoBottom+=0.3;
               // console.log('nif khaddam',probtoGoBottom)
            }else if((this.EyesmovmentsMemory[i][1][1]-this.EyesmovmentsMemory[i+1][1][1])>=1 && (this.EyesmovmentsMemory[i][2][1]-this.EyesmovmentsMemory[i+1][2][1])<0.1){
                probtoGoTop+=0.3;
                //console.log('hajeb khddam',probtoGoTop)
            }else{

            }
            this.ImpOrder(probtoGoTop,probtoGoBottom);
        }
    
    }
    ImpOrder(probtoGoTop,probtoGoBottom){
        if(probtoGoTop>=0.2){
            spScroll-=4;
            if(spScroll<0){
                spScroll=0;
            }
            Container.scrollTo(0,spScroll)
            //console.log('gir top',spScroll)
        }else if(probtoGoBottom>0.5){
            spScroll+=4;
            Container.scrollTo(0,spScroll)
            //console.log('gir bottom',spScroll)
        }
    }
    loadModels(){
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
            faceapi.nets.faceExpressionNet.loadFromUri('./models')
        ]).then(startVideo);
    }
    getEyeCenter(Eye){
        const EyeCenter = Eye.reduce((acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }), { x: 0, y: 0 })
        EyeCenter.x /= Eye.length;
        EyeCenter.y /= Eye.length;
        return EyeCenter;
    }
    getFaceHorizantaleDirection(Eyexcenter, nosePosition) {
        let horizontaleGazeDirection = '';

        if (nosePosition - Eyexcenter > 2) {
            horizontaleGazeDirection = 'left';
        } else if (Eyexcenter - nosePosition > 2) {
            horizontaleGazeDirection = 'right';
        } else {
            horizontaleGazeDirection = 'face';
        }

        return horizontaleGazeDirection;
    }
    getFaceVerticaleDirection(Eyeycenter, nosePosition) {
        let horizontaleGazeDirection = '';

        if (nosePosition - Eyeycenter > 2) {
            horizontaleGazeDirection = 'bottom';
        } else if (Eyeycenter - nosePosition > 2) {
            horizontaleGazeDirection = 'top';
        } else {
            horizontaleGazeDirection = 'face';
        }

        return horizontaleGazeDirection;
    }
}