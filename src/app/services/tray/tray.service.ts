import { Injectable } from '@angular/core';
import * as os from 'os';
import { Subscription } from 'rxjs';
import { BaseIpcProxy } from '../../common/io/base-ipc-proxy';
import { BaseSettings } from '../../common/settings/base-settings';
import { TrayServiceBase } from './tray.service.base';
import { TranslatorServiceBase } from '../translator/translator.service.base';

@Injectable()
export class TrayService implements TrayServiceBase {
    private subscription: Subscription = new Subscription();

    public constructor(
        private translatorService: TranslatorServiceBase,
        private settings: BaseSettings,
        private ipcProxy: BaseIpcProxy,
    ) {
        this.subscription.add(
            this.translatorService.languageChanged$.subscribe(() => {
                this.updateTrayContextMenu();
            }),
        );

        this.updateTrayContextMenu();
    }

    public get invertNotificationAreaIconColor(): boolean {
        return this.settings.invertNotificationAreaIconColor;
    }

    public set invertNotificationAreaIconColor(v: boolean) {
        this.settings.invertNotificationAreaIconColor = v;
        this.updateTrayIcon();
    }

    public get needInvertNotificationAreaIconColor(): boolean {
        return os.platform() !== 'darwin';
    }

    public updateTrayContextMenu(): void {
        const arg = {
            showDopamineLabel: this.translatorService.get('show-dopamine'),
            exitLabel: this.translatorService.get('exit'),
        };
        this.ipcProxy.sendToMainProcess('update-tray-context-menu', arg);
    }

    private updateTrayIcon(): void {
        this.ipcProxy.sendToMainProcess('update-tray-icon', undefined);
    }
}
