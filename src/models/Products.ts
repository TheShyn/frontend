interface ICateId{
    _id: string;
    name:string
  }
interface IData {
    _id:string | undefined,
    name:string,
    price:string,
    img:string,
    description:string,
    categoryId:ICateId
}
export default IData