const subsQueryParams = new URLSearchParams(window.location.search)

/**
 * click_id: "your_param_name"
 * sub1, ..., sp: - same
 *
 * click_id: "название_параметра"
 * sub1, ..., sp: - аналогично
 */
const subs = {
    sub1: "votes",
    sub2: "votes1",
    sub3: "votes2",
    sub4: "votes3",
    sp: "sp",
    click_id: "votest"
}

makeSubs()

document.querySelectorAll("form").forEach(form => attachHiddenSubs(form))

function attachHiddenSubs(form) {
    for (const sub of Object.keys(subs)) {
        let subValue = sessionStorage.getItem(sub)

        if (subValue) {
            const el = document.createElement("input")

            el.name = sub
            el.value = subValue
            el.type = "hidden"

            form.appendChild(el)
        }
    }
}

function makeSubs() {
    for (const [sub, value] of Object.entries(subs)) {
        let subFromQuery = subsQueryParams.get(value)

        if (subFromQuery) {
            subs[sub] = subFromQuery
            sessionStorage.setItem(sub, subFromQuery)
        } else {
            let subFromSession = sessionStorage.getItem(sub)

            if (subFromSession) {
                subs[sub] = subFromSession
            }
        }
    }
}
