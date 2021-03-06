/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ServiceBusManagementClient } from 'azure-arm-sb';
import { AzureWizardPromptStep, createAzureClient } from 'vscode-azureextensionui';
import { localize } from '../../../localize';
import { promptForResource } from '../../../utils/azure';
import { IServiceBusWizardContext } from './IServiceBusWizardContext';

export class ServiceBusListStep extends AzureWizardPromptStep<IServiceBusWizardContext> {
    public async prompt(wizardContext: IServiceBusWizardContext): Promise<void> {
        const placeHolder: string = localize('placeHolder', 'Select a service bus namespace');
        const client: ServiceBusManagementClient = createAzureClient(wizardContext, ServiceBusManagementClient);
        wizardContext.sbNamespace = await promptForResource(placeHolder, client.namespaces.list());
    }

    public shouldPrompt(wizardContext: IServiceBusWizardContext): boolean {
        return !wizardContext.sbNamespace;
    }
}
