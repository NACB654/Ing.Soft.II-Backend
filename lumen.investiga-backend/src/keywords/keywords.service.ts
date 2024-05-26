import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Keyword } from "./keywords.model";

@Injectable({})
export class KeywordsService {
  constructor(@InjectModel(Keyword) private keywordModel: typeof Keyword) { }
  
  async findOrCreateKewords(keywordDto: string[]): Promise<Keyword[]> {
    const keywords = await Promise.all(
      keywordDto.map(async (keywordName: string) => {
        let keyword = await this.keywordModel.findOne({
          where: { descripcion: keywordName },
        });
        if (!keyword) {
          keyword = await this.keywordModel.create({ descripcion: keywordName });
        }
        return keyword;
      }),
    );

    return keywords;
  }
}