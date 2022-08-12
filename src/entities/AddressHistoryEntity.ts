import { IAddress } from "@/types/address";
import { Entity, PrimaryGeneratedColumn, Column, getRepository, Repository, BaseEntity } from "typeorm";



@Entity("address")
export class AddressEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  placeId: string;

  @Column("text")
  route: string;

  @Column("text")
  formattedAddress: string;

  @Column("double")
  latitude: number;

  @Column("double")
  longitude: number;



  static addAddress = async (address: IAddress) => {
    try {
      let find = await AddressEntity.findOne({
        where: { placeId: address.placeId },
      });
      if (find) {
        return;
      }
      find = new AddressEntity;
      find.placeId = address.placeId;
      find.formattedAddress = address.formattedAddress;
      find.route = address.route;
      find.latitude = address.latitude;
      find.longitude = address.longitude;
      await find.save()
    } catch (error) {
      console.log('error save address', error);
    }
  };
}