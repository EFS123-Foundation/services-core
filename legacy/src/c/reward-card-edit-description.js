import m from 'mithril';

const rewardCardEditDescription = {

    view: ({state, attrs}) => {
        const {
            reward,
            descriptionError,
            inlineError
        } = attrs;

        return [
            m('.w-row',
              m('label.fontsize-smaller',
                'Descrição:'
               )
             ),
            m('.w-row', [
                m('textarea.text.required.w-input.text-field.positive.height-medium[aria-required=\'true\'][placeholder=\'Descreva sua recompensa\'][required=\'required\']', {
                    value: reward.description(),
                    class: descriptionError() ? 'error' : false,
                    oninput: m.withAttr('value', reward.description)
                }),
                m(".fontsize-smaller.text-error.u-marginbottom-20.fa.fa-exclamation-triangle.w-hidden[data-error-for='reward_description']",
                  'Descrição não pode ficar em branco'
                 )
            ]),
            descriptionError() ? inlineError('Descrição não pode ficar em branco.') : ''
        ];
    }
};

export default rewardCardEditDescription;
