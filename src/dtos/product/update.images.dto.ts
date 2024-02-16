export class UpdateImagesDto {
  private constructor(public id: string, public images: string[]) {}

  static update(
    id: string,
    object: { [key: string]: any }
  ): [string?, UpdateImagesDto?] {
    const { images } = object;
    let errorType = 0;

    if (!id) return ["Missing id"];
    if (!images) return ["Missing images"];
    images.forEach((image: any) => {
      if (typeof image != "string") {
        errorType++;
        return;
      }
    });
    if (errorType > 0) return ["Images must be type string"];
    if (images.length === 0) return ["Missing images"];

    return [undefined, new UpdateImagesDto(id, images)];
  }
}
