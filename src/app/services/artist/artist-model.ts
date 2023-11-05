import { SemanticZoomable } from '../../common/semantic-zoomable';
import { Strings } from '../../common/strings';
import { ISelectable } from '../../interfaces/i-selectable';
import { TranslatorServiceBase } from '../translator/translator.service.base';

export class ArtistModel extends SemanticZoomable implements ISelectable {
    public constructor(
        public name: string,
        private translatorService: TranslatorServiceBase,
    ) {
        super();
    }

    public isSelected: boolean = false;

    public get displayName(): string {
        if (Strings.isNullOrWhiteSpace(this.name)) {
            return this.translatorService.get('Artist.UnknownArtist');
        }

        return this.name;
    }
}
