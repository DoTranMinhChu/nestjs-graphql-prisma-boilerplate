import { ApiProperty } from "@nestjs/swagger";

export class QueryInfoPrismaDto {
    @ApiProperty({
      name: 'select',
      default: '["$all"]',
      nullable: true,
      required: false,
      type: "string"
    })
    select?: any;
  
  
    @ApiProperty({
      name: 'where',
      default: '{}',
      type: "string",
      required: false
    })
  
    where?: any;
  
    @ApiProperty({
      name: 'limit',
      default: 'unlimited',
      nullable: true,
      required: false,
      type: "string"
    })
    take?: number;
  
    @ApiProperty({
      name: 'page',
      default: 1,
      required: false,
  
    })
    skip?: number;
  
    @ApiProperty({
      name: 'order',
      default: '[{"updatedAt":"asc"}]',
      required: false,
      type: "string"
    })
    orderBy?: any;
  
  
  }