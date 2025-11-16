import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class FusionPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(metadata)
        return value
            ;
    }

}