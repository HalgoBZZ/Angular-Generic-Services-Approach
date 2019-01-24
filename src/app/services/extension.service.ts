import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ExtensionService extends BaseService {

    fromRevised(leadDatasetItemId) {
        return this.callServiceMethodGet('/assessments/fromRevised/' + leadDatasetItemId);
    }

    fromDerived(leadDatasetRevisionId) {
        return this.callServiceMethodGet('/assessments/fromDerived/' + leadDatasetRevisionId);
    }

    fromRevisedConfirmation(leadDatasetItemId) {
        return this.callServiceMethodGet('/assessments/confirmations/fromRevised/' + leadDatasetItemId);
    }

    fromDerivedConfirmation(leadDatasetRevisionId) {
        return this.callServiceMethodGet('/assessments/confirmations/fromDerived/' + leadDatasetRevisionId);
    }

    addRating(differenceId, body, certifier?) {
        let certifierLogin = '';
        if (certifier) {
            certifierLogin = '?certifierLogin=' + certifier;
        }
        return this.callServiceMethodPost('/assessments/' + differenceId + certifierLogin, body);
    }

    saveVariantAssassement(differenceId, assessmentId) {
        return this.callServiceMethodPostByQuery('/assessments/' + differenceId + '/' + assessmentId);
    }

    updateRating(id, version, certifier, rating) {
        let certifierLogin = '';
        if (certifier) {
            certifierLogin = '?certifierLogin=' + certifier;
        }
        return this.callServiceMethodPut('/assessments/' + id + '/' + version + certifierLogin, rating);
    }

    updateConfirmationRating(id, version, rating) {
        return this.callServiceMethodPut('/assessments/confirmations/' + id + '/' + version, rating);
    }

    getRatingSnapshots(assessmentId) {
        return this.callServiceMethodGet('/assessments/' + assessmentId + '/snapshots');
    }

}
