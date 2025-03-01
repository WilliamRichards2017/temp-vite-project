export default class Square{


  constructor(className, text)
  {
    this.className = className;
    this.text = text;
    this.count = 0;
  }
  getClassName()
  {
    return this.className;
  }
  getText(){
    return this.text;
  }
}
