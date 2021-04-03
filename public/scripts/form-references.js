function updateSectionReference() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, sectionIndex) => {
        const groupings = section.querySelectorAll('section > [class*="border"]');
        groupings.forEach((group, groupIndex) => {
            switch (groupIndex) {
                case 0:
                    const textArea = group.querySelector('textarea');
                    if (!textArea) return;
                    const titleReference = `s${sectionIndex}|t`;
                    group.querySelector('label').setAttribute('for', titleReference);
                    textArea.setAttribute('id', titleReference);
                    textArea.setAttribute('name', titleReference);
                    break;
                case 1:
                    const descriptionRows = group.querySelectorAll('[class*="row"]');
                    descriptionRows.forEach((description, descriptionIndex) => {
                        const textArea = description.querySelector('textarea');
                        if (!textArea) return;
                        const descriptionReference = `s${sectionIndex}|d${descriptionIndex}`;
                        description.querySelector('label').setAttribute('for', descriptionReference);
                        textArea.setAttribute('id', descriptionReference);
                        textArea.setAttribute('name', descriptionReference);
                    });
                    break;
                case 2:
                    // need a separate function that can be called to iterate through breakdowns of breakdowns
                    // setBreakdownReferences()

                    const breakdownRows = group.querySelectorAll('ol > .row.mx-0');
                    breakdownRows.forEach((breakdown, breakdownIndex) => {
                        const textArea = breakdown.querySelector('textarea');
                        if (!textArea) return;
                        const breakdownReference = `s${sectionIndex}|s${breakdownIndex}`;
                        breakdown.querySelector('label').setAttribute('for', breakdownReference);
                        textArea.setAttribute('id', breakdownReference);
                        textArea.setAttribute('name', breakdownReference);
                    });

                    break;
                default:
                    break;
            };
        });
    });
};